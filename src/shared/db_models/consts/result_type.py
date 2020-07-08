class Result:
    def __init__(self, result: bool, error = None, item = None, list = [], comment = None):
        self.result = result
        self.error = error
        self.item = item
        self.list = list
        self.comment = comment
