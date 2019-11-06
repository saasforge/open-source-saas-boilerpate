from flask_restplus import Namespace, Resource, fields

jwt_api = Namespace('dashboard', path='/app/api/jwt/')

@jwt_api.route('/userdata')
class user_data(Resource):
    def get(self):
        return jsonify({
            'result': True
        })