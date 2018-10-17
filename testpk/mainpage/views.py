from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

def mainpage(request):
    return render(request, 'mainpage.html', {})

def home(request):
    return render(request, 'home.html', {})

def about(request):
    return render(request, 'about.html', {})

def medtools(request):
    return render(request, 'medtools.html', {})

def pharmatools(request):
    return render(request, 'pharmatools.html', {})

# def pktools(request):
#     return render(request, 'pktools.html', {})

# @login_required(login_url = '/accounts/login/')
def tools(request):
    return render(request, 'tools.html', {})

def healthcare(request):
    return render(request, 'healthcare.html', {})
