import re

import drf_extra_fields.fields as drf_extra_fields
import drf_writable_nested.mixins as writable_nested_mixins
import rest_framework.fields as drf_fields


class WritableNestedMixins(writable_nested_mixins.NestedCreateMixin, writable_nested_mixins.NestedUpdateMixin):
    pass


class Base64ImageField2(drf_extra_fields.Base64ImageField):
    def validate_empty_values(self, data):
        url_regex = r'(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)'
        if re.match(url_regex, str(data)):
            raise drf_fields.SkipField()
        else:
            return super().validate_empty_values(data)