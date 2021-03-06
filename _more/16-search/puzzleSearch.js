var util = require('util') 
var log = print 
var up = 1, right=2, down=3, left=4 

def enqueue(a, o) : a.push(o)  
def dequeue(a) : return a.shift()  
def equal(a, b) : return JSON.stringify(a)===JSON.stringify(b)  
def board2str(b) : return b.join('\n')  

def findXY(board, value) :
  for (var x=0  x<board.length  x++)
    for (var y=0  y<board[x].length  y++)
      if (board[x][y] === value)
        return :x:x,y:y 
  return null 


def boardClone(b) :
  var nb = [] 
  for (var x in b)
    nb[x] = b[x].slice(0) 
  return nb 


def swap(b,x1,y1,x2,y2) :
  x2 = Math.round(x2), y2=Math.round(y2) 
  if (x2<0 || x2 > 2 || y2<0 || y2>2) 
    return false 
  var t = b[x1][y1] 
  b[x1][y1]=b[x2][y2] 
  b[x2][y2]=t 
  return true 


def move(board, dir) : # 加入所有可能的移動方式
  var xy = findXY(board, 0)  # 找出空格 0 的位置
  var x = xy.x, y=xy.y 
  var nboard = boardClone(board) 
  var s = false 
  switch (dir) :
    case up:    s=swap(nboard,x,y,x-1,y)  break  # 空格和上面一格交換
    case right: s=swap(nboard,x,y,x,y+1)  break  # 空格和右邊一格交換
    case down:  s=swap(nboard,x,y,x+1,y)  break  # 空格和下面一格交換
    case left:  s=swap(nboard,x,y,x,y-1)  break  # 空格和左邊一格交換
  
  if (s)
    return nboard 
  else
    return null 


def moveAdd(board, dir, neighbors) : # 向 dir 方向移動，並加入到 neighbors 陣列中
  var nboard = move(board, dir) 
  if (nboard !== null) :
    neighbors.push(nboard) 
  


def getNeighbors(board) : # 取得所有鄰居
  var neighbors = [] 
  moveAdd(board, up,    neighbors) 
  moveAdd(board, down,  neighbors) 
  moveAdd(board, right, neighbors) 
  moveAdd(board, left,  neighbors) 
  return neighbors 


var goal = [[1,2,3], 
            [8,0,4],
            [7,6,5]] 

var start= [[1,3,4], 
            [8,2,5],
            [7,0,6]] 

var queue=[start]  # BFS 用的 queue, 起始點為 1。
var visited=: 
var parent=: 
var level=: 

def bfs(q, goal) : # 廣度優先搜尋
  while (q.length > 0) :
    var node = dequeue(q)  # 否則、取出 queue 的第一個節點。
    var nodestr = board2str(node) 
#  log('q.length=%d level=%d\n===node===\n%s==parent==\n%s', q.length, level[nodestr], nodestr, parent[nodestr])  # 印出節點
    if (equal(node, goal)) return true 
    if (visited[nodestr]===undefined) # 如果該節點尚未拜訪過。
      visited[nodestr] = true         #   標示為已拜訪
    else                              # 否則 (已訪問過)
      continue                        #   不繼續搜尋，直接返回。
    var neighbors = getNeighbors(node)  # 取出鄰居。
    for (var i in neighbors) :        # 對於每個鄰居
      var n = neighbors[i] 
      var nstr = board2str(n) 
      if (!visited[nstr]) :    # 假如該鄰居還沒被拜訪過
        parent[nstr] = nodestr 
        level[nstr] = level[nodestr] + 1 
        enqueue(q, n)          #   就放入 queue 中
      
    
  
  return false 


def backtrace(goal) :
  log('======= backtrace =========') 
  var nodestr = board2str(goal) 
  while (nodestr !== undefined) :
    log('%s\n', nodestr) 
    nodestr = parent[nodestr] 
  


level[board2str(start)]=0 
var found = bfs(queue, goal)  # 呼叫廣度優先搜尋。
log('bfs:found=%s', found) 
if (found)
  backtrace(goal) 
