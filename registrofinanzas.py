from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("src/credentials.js")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/registro', methods=['GET', 'POST'])
def handle_registros():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            doc_ref = db.collection('registros').document()
            doc_ref.set({
                "descripcion": data['descripcion'],
                "monto": data['monto'],
                "tipo": data['tipo'],
                "fecha": data['fecha']
            })
            return {"message": f"registro {data['descripcion']} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        docs = db.collection('registros').stream()

        results = []

        for doc in docs:
            registro = doc.to_dict()
            registro['fecha'] = str(registro['fecha'])
            results.append(registro)

        return {"count": len(results), "registros": results, "message": "success"}

if __name__ == '__main__':
    app.run(debug=True)
