import matplotlib
matplotlib.use("Agg")
from flask import Flask, jsonify, request, json 
from flask_cors import CORS
import pandas as pd
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist
from sklearn.metrics import pairwise_distances
from sklearn import metrics
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
from googletrans import Translator

app = Flask(__name__)

CORS(app)

df = pd.read_csv("city-gps-modified.csv")

@app.route('/route_optimization', methods=['POST'])
def login():
    input = request.get_json()['input']
    
    print(input)
    ip = input['input']
    # ip = [
    # {'partner': 'Alma', 'order': '1000'},
    # {'partner': 'Appling', 'order': '4000'},
    # {'partner': 'Athens', 'order': '9000'},
    # {'partner': 'Atlanta', 'order': '6000'},
    # {'partner': 'Trenton', 'order': '5000'},
    # {'partner': 'Valdosta', 'order': '2000'},
    # {'partner': 'Waycross', 'order': '8000'},
    # {'partner': 'Westoak', 'order': '3000'},
    # {'partner': 'Wrens', 'order': '7000'},
    #  {'partner': 'Bartow', 'order': '6000'},
    # {'partner': 'Baxley', 'order': '5000'},
    # {'partner': 'Brunswick', 'order': '2000'},
    # {'partner': 'Butler', 'order': '8000'},
    # {'partner': 'Nelson', 'order': '3000'},
    # {'partner': 'Pearson', 'order': '7000'},
    #  {'partner': 'Perry', 'order': '6000'},
    # {'partner': 'Register', 'order': '5000'},
    # {'partner': 'Tifton', 'order': '2000'},
    # {'partner': 'Waycross', 'order': '8000'},
    # {'partner': 'Trenton', 'order': '3000'},
    # {'partner': 'Macon', 'order': '7000'},
    # {'partner': 'Fort_Benning', 'order': '2000'},
    # {'partner': 'Fort_Valley', 'order': '9000'},
    # {'partner': 'Gainesville', 'order': '1000'},
    # {'partner': 'Gracewood', 'order': '3000'},
    # {'partner': 'Griffin', 'order': '5000'},
    # {'partner': 'Hazlehurst', 'order': '2000'},
    # {'partner': 'Jacksonville', 'order': '1800'},
    # {'partner': 'Jasper', 'order': '2900'},
    # {'partner': 'Jesup', 'order': '3700'},
    # ]
    for row in ip:
        df_val = df.loc[df['partner'] == row['partner'], ['long', 'lat']]
        row['longitude'] = df_val['long'].iloc[0]
        row['latitude'] = df_val['lat'].iloc[0]
    
    locations = pd.DataFrame(ip)


    # Remove duplicate points
    locations.drop_duplicates(subset=['longitude', 'latitude'], inplace=True)

    min_orders_per_cluster = 6000
    num_clusters = 2  # Start with 2 clusters
    best_silhouette_score = -1
    best_num_clusters = num_clusters

    max_iterations = 1000  # Maximum number of iterations
    num_iterations = 0  # Counter for number of iterations

    while True and num_iterations < max_iterations and num_clusters < 8:
        kmeans = KMeans(n_clusters=num_clusters)
        kmeans.fit(locations[['longitude', 'latitude']])
        locations['cluster'] = kmeans.predict(locations[['longitude', 'latitude']])

        orders_per_cluster = locations.groupby('cluster')['order'].sum()
        orders_per_cluster = orders_per_cluster.astype(float)
        under_filled_clusters = orders_per_cluster[orders_per_cluster < min_orders_per_cluster]

        if len(under_filled_clusters) == 0:
            locations_subset = locations[['longitude', 'latitude']]  # Subset of columns for silhouette score computation
            silhouette_avg = silhouette_score(locations_subset, locations['cluster'])
            if silhouette_avg > best_silhouette_score:
                best_silhouette_score = silhouette_avg
                best_num_clusters = num_clusters
        else:
            num_clusters = min(len(locations), min_orders_per_cluster)
            continue

        num_clusters += 1
        num_iterations += 1
        print(num_clusters)

    # Re-run the best clustering with optimal number of clusters
    kmeans = KMeans(n_clusters=best_num_clusters)
    kmeans.fit(locations[['longitude', 'latitude']])
    locations['cluster'] = kmeans.predict(locations[['longitude', 'latitude']])

    orders_per_cluster = locations.groupby('cluster')['order'].sum()
    centroids = locations.groupby('cluster')[['longitude', 'latitude']].mean()

    # Print the results
    print("Optimal Number of Clusters: ", best_num_clusters)

    
    partners_per_cluster = locations.groupby('cluster')['partner'].apply(list)
    for cluster_id, partners in partners_per_cluster.iteritems():
        print(f"Cluster {cluster_id}: {partners}")

    # Fit t-SNE model with reduced perplexity
    perplexity = 10  # Update perplexity value here
    tsne = TSNE(n_components=2, perplexity=perplexity, random_state=42)
    tsne_result = tsne.fit_transform(locations[['longitude', 'latitude']])

    # Add t-SNE coordinates to the locations DataFrame
    locations['tsne_x'] = tsne_result[:, 0]
    locations['tsne_y'] = tsne_result[:, 1]

    # Plot the clusters using t-SNE coordinates
    plt.figure(figsize=(8, 6))
    plt.scatter(locations['tsne_x'], locations['tsne_y'], c=locations['cluster'], cmap='viridis')
    plt.title('Cluster Visualization using t-SNE')
    plt.xlabel('t-SNE X')
    plt.ylabel('t-SNE Y')
    plt.colorbar(label='Cluster')
    plt.savefig("../../frontend/src/images/route.png")
    plt.clf()
    
    result = input
    
    result = jsonify({"result":result})
    
    return result 

@app.route('/test', methods=['POST'])
def test():
    text = request.get_json()['text']
    language = request.get_json()['language']
    result = ""
    lang_dict = {"French": "fr", "Spanish": "es", "German": "de"}
    lang = lang_dict[language]
    # Create a Translator object
    translator = Translator()

    # Translate the text to the target language
    translated_text = translator.translate(text, dest=lang)

    # Return the translated text
    result = jsonify({"result":translated_text.text,"text":text})

    return result 
    



if __name__ == '__main__':
    print("Hello!")
    app.run(debug=True)