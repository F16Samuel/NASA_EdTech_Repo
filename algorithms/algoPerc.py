import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(content1, content2):
    # Create a TF-IDF vectorizer to convert text to vectors
    vectorizer = TfidfVectorizer()
    
    # Combine the contents into a single list
    documents = [content1, content2]
    
    # Transform the documents into TF-IDF matrix
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    # Calculate cosine similarity between the two documents
    similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    
    # Cosine similarity returns a value between 0 and 1, multiply by 100 to get percentage
    similarity_percentage = similarity_matrix[0][0] * 100
    
    return similarity_percentage

# Example content for testing
content1 = "This is a sample document to test plagiarism detection."
content2 = "This is a document sample to test plagiarism."

# Calculate similarity
plagiarism_percentage = calculate_similarity(content1, content2)

# Output the plagiarism percentage
print(f"The content is {plagiarism_percentage:.2f}% plagiarized.")