var R = require('./random')

'''
E = N | E [+/-*] E
N = 0-9
'''

def E() :
  var gen = R.randSelect(["N", "EE"]) 
  if (gen  === "N") :
      return N() 
   else :
      return E() + R.randSelect(["+", "-", "*", "/"]) + E() 
   


def N() :
  return R.randSelect(["1", "2", "3", "4", "5", "6", "7", "8", "9"]) 


var e = E() 
print(e, "=", eval(e)) 
