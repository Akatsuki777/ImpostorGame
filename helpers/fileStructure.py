import os

IGNORE_LIST = ["helpers","impostor"]

def listChildren(dir,depth):
    retVal = ""
    tabVal = "\t" * depth
    if (depth>5):
        return ''
    for children in os.listdir(dir):
        if(os.path.isdir(os.path.join(dir,children)) and not(children in IGNORE_LIST)):
            folderContent = listChildren(os.path.join(dir,children),depth+1)
            if not(folderContent):
                folderContent = ""
            retVal += tabVal+"└─"+children+"/\n"+folderContent
        else:
            if(children[0]=='.'):
                continue
            else:
                retVal += tabVal+"├─"+children+"\n"
    
    return retVal


if __name__ == "__main__":

    printVal = listChildren(os.getcwd(),0)

    print(printVal)


