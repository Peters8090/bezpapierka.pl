from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1000, blank=True)
    link = models.CharField(max_length=50, unique=True)
    exact = models.BooleanField(default=True)
    icon = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.title


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=50)
    subheading = models.CharField(max_length=100)
    background_image = models.ImageField(upload_to='pages/home_page/background_image', blank=True)


# endregion


# region OfferPage
class OfferPage(Page):
    pass


class Offer(models.Model):
    offer_page = models.ForeignKey(OfferPage, related_name='offers', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    superscription = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='pages/offer_page/offers')


class Step(models.Model):
    offer = models.ForeignKey(Offer, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=500)


class Section(models.Model):
    offer = models.ForeignKey(Offer, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True)
    contents = models.CharField(max_length=2000)


# endregion


# region ContactPage
class ContactPage(Page):
    contact_form_email = models.EmailField(blank=True)


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, related_name='basic_infos', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True)
    icon = models.CharField(max_length=50, unique=True)


# endregion


# region ContentsPage
class ContentPage(Page):
    contents = models.CharField(max_length=2000, unique=True)
    image = models.ImageField(upload_to='pages/content_page/image')
# endregion
