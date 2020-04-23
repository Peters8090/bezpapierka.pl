from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=1000, blank=True)
    link = models.CharField(max_length=20, unique=True)
    exact = models.BooleanField(default=True)
    icon = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.title


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=20)
    subheading = models.CharField(max_length=100)


# endregion


# region OfferPage
class OfferPage(Page):
    pass


class Offer(models.Model):
    offer_page = models.ForeignKey(OfferPage, on_delete=models.CASCADE)
    title = models.CharField(max_length=20, unique=True)
    slug = models.SlugField(unique=True)
    superscription = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='pages/offer_page/offers')


class Step(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    title = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=500)


class Section(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    title = models.CharField(max_length=20, unique=True)
    contents = models.CharField(max_length=2000)


# endregion


# region ContactPage
class ContactPage(Page):
    pass


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=50, unique=True)


# endregion


# region ContentsPage
class ContentsPage(Page):
    contents = models.CharField(max_length=2000, unique=True)
    image = models.ImageField(upload_to='pages/contents_page/image')
# endregion
