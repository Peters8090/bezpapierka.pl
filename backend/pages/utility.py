class SerializerWithImageFieldMixin:
    def validate_empty_values(self, data):
        data2 = data.copy()
        if data2.__contains__("image") and hasattr(data2['image'], '__contains__') and data2["image"].__contains__("http"):
            data2.pop("image")
        return super().validate_empty_values(data2)