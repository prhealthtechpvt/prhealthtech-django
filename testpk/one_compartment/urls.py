from django.urls import path
from . import views

urlpatterns = [
    path('comparitivestudies', views.ComparitiveModel, name= 'COMPARITIVE'),
    path('evroute', views.EVPModel, name= 'EVROUTE'),
    path('evrouteued', views.EVUModel, name= 'EVROUTEUED'),
    path('ivbolus', views.IVPModel, name= 'IVBOLUS'),
    path('ivbolusued', views.IVUModel, name= 'IVBOLUSUED'),
    path('ivinfusion', views.IFPModel, name= 'IVINFUSION'),
    path('ocmodel', views.ocmodel, name='OCMODEL'),
]
