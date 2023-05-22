from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
CORS(app)

class Registro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(80))
    monto = db.Column(db.Float)
    tipo = db.Column(db.String(10))
    fecha = db.Column(db.DateTime)

@app.route('/registro', methods=['GET', 'POST'])
def handle_registros():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_registro = Registro(descripcion=data['descripcion'], monto=data['monto'], tipo=data['tipo'], fecha=data['fecha'])
            db.session.add(new_registro)
            db.session.commit()
            return {"message": f"registro {new_registro.descripcion} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        registros = Registro.query.all()
        results = [
            {
                "descripcion": registro.descripcion,
                "monto": registro.monto,
                "tipo": registro.tipo,
                "fecha": str(registro.fecha)
            } for registro in registros]

        return {"count": len(results), "registros": results, "message": "success"}

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
