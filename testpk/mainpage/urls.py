from django.urls import path
from . import views


urlpatterns = [
    path('', views.mainpage, name='MainPage'),
    path('home', views.home, name='Home'),
    path('about', views.about, name='About'),
    path('medtools', views.medtools, name='MedTools'),
    path('pharmatools', views.pharmatools, name='PharmaTools'),
    # path('pktools', views.pktools, name='PKTools'),
    path('tools/', views.tools, name='tools'),
    path('heathcare', views.healthcare, name='healthcare'),
]
