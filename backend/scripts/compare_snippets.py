import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pymongo

def calculate_similarity(content1, content2):
    vectorizer = TfidfVectorizer()
    documents = [content1, content2]
    tfidf_matrix = vectorizer.fit_transform(documents)
    similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    similarity_percentage = similarity_matrix[0][0] * 100
    return similarity_percentage

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['nasa_edtech_repo']
collection = db['submissions']

snippets = list(collection.find({}))

if len(snippets) >= 2:
    content1 = snippets[0]['code']
    content2 = snippets[1]['code']
    
    plagiarism_percentage = calculate_similarity(content1, content2)
    
    print(f"The content is {plagiarism_percentage:.2f}% plagiarized.")
else:
    print("Not enough snippets to compare.")
