
# Create your views here.
from django.shortcuts import render

def ComparitiveModel(request):
    return render(request, 'comparitivestudies.html', {})
def EVPModel(request):
    return render(request, 'evroute.html', {})
def EVUModel(request):
    return render(request, 'evrouteued.html', {})
def IVPModel(request):
    bolusparameter = {

    }
    return render(request, 'ivbolus.html', bolusparameter)
def IVUModel(request):
    return render(request, 'ivbolusued.html', {})
def IFPModel(request):
    return render(request, 'ivinfusion.html', {})
def ocmodel(request):
    return render(request, 'ocbase.html', {})
