from src.shared.utils.extensions import db


class GenericEntity:
    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as ex:
            print("ERROR while saving entity ", self.__tablename__)
            print(ex)  # to-do: log
            return False
        return True

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as ex:
            print("ERROR while saving entity ", self.__tablename__)
            print(ex)  # to-do: log
            return False
        return True

    def update(self, entity_dict):
        for key, value in entity_dict.items():
            if hasattr(self, key) and key != "id":
                setattr(self, key, value)
