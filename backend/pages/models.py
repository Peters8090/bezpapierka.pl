from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=1000, blank=True)
    link = models.CharField(max_length=20)
    exact = models.BooleanField(default=True)
    icon = models.CharField(max_length=50)

    class Meta:
        abstract = True


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=20)
    subheading = models.CharField(max_length=100)


# endregion


# region OfferPage
class OfferPage(Page):
    pass


class Offer(models.Model):
    title = models.CharField(max_length=20)
    slug = models.SlugField()
    superscription = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='pages/offer_page/offers')


class Step(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=500)


class Section(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    contents = models.CharField(max_length=2000)


# endregion


# region ContactPage
class ContactPage(Page):
    pass


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)


# endregion


# region ContentsPage
class ContentsPage(Page):
    contents = models.CharField(max_length=2000)
    image = models.ImageField(upload_to='pages/contents_page/image')
# endregion
