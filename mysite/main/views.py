from rest_framework.response import Response
from rest_framework.decorators import api_view      

from .keyword_integration import get_keywords
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse

from .models import ToDoList, Item
from .forms import CreateNewList
from django.shortcuts import render

# Create your views here.

@api_view(['GET'])
def getData(request):
    person = {'Name': 'Denise','Age': 28}
    return Response(person)

def keyword_search(resquest):
    query = resquest.GET.get('query')
    keywords = get_keywords(query)
    
    if keywords:
        return JsonResponse({'keywords': keywords})
    else:
        return JsonResponse({'error': 'EveryPixel API Error'})

def index(response, id):
    ls = ToDoList.objects.get(id=id)
    
    if response.method == "POST":
        print(response.POST)
        if response.POST.get("save"):
            for item in ls.item_set.all():
                if response.POST.get("c" + str(item.id)) == "clicked":
                    item.complete = True
                else:
                    item.complete = False
                    
                item.save()
                
        elif response.POST.get("newItem"):
            txt = response.POST.get("new")
            if len(txt) > 2:
                ls.item_set.create(text=txt, complete=False)
            else:
                print("Invalid")
    
    return render(response, "main/list.html", {"ls": ls})

def home(response):
    return render(response, "main/home.html", {})

def create(response):
    if response.method == "POST":
        form = CreateNewList(response.POST)
        
        if form.is_valid():
            n = form.cleaned_data["name"]
            t = ToDoList(name=n)
            t.save() 
            
        return HttpResponseRedirect("/%i" %t.id)
              
    else:
        form = CreateNewList()
    return render(response, "main/create.html", {"form": form})

