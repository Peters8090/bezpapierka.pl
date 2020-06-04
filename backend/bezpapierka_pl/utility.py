from django.utils.translation import get_language

from django.utils.translation.trans_real import DjangoTranslation
from django.views.i18n import JSONCatalog


class JSONCatalogWithDomainListSupport(JSONCatalog):
    def get(self, request, *args, **kwargs):
        locale = get_language()
        domain = kwargs.get('domain', self.domain)
        packages = kwargs.get('packages', '')
        packages = packages.split('+') if packages else self.packages
        paths = self.get_paths(packages) if packages else None
        if isinstance(domain, list) or isinstance(domain, tuple):
            if len(domain) > 0:
                for i, domainn in enumerate(domain):
                    if i == 0:
                        self.translation = DjangoTranslation(locale, domain=domainn, localedirs=paths)
                    else:
                        self.translation.merge(DjangoTranslation(locale, domain=domainn, localedirs=paths))
            else:
                domain = 'djangojs'
        if isinstance(domain, str):
            self.translation = DjangoTranslation(locale, domain=domain, localedirs=paths)
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)
