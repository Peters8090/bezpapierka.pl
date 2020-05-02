class SerializerWithImageFieldMixin:
    def validate_empty_values(self, data):
        data2 = data.copy()
        possibleImageFieldNames = ('image', 'background_image')

        for possibleImageFieldName in possibleImageFieldNames:
            if data2.__contains__(possibleImageFieldName) and hasattr(data2[possibleImageFieldName], '__contains__') and data2[possibleImageFieldName].__contains__("http"):
                data2.pop(possibleImageFieldName)


        return super().validate_empty_values(data2)