from fastapi import FastAPI,UploadFile,Form,Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con =sqlite3.connect('db.db',check_same_thread=False)
cur=con.cursor()

#instead of using db tool like dbeaver,will insert sql query in backend 
cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            image BLOB,
            price INTEGER NOT NULL, 
            description TEXT, 
            place TEXT NOT NULL,
            insertAt Integer NOT NULL
            );
            """)

app=FastAPI()

@app.post('/items')
async def create_items(image:UploadFile,
                 title:Annotated[str,Form()],
                 price:Annotated[int,Form()],
                 description:Annotated[str,Form()],
                 place:Annotated[str,Form()],
                 insertAt:Annotated[int,Form()]
                 ):
    image_bytes=await image.read()
    cur.execute(f"""
                INSERT INTO items(title,image,price,description,place,insertAt)
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}', '{place}',{insertAt})
                """)
    con.commit()
    return '200'

@app.get('/items')
async def get_items():
    #calling column names as well
    con.row_factory=sqlite3.Row
    
    #updateing current location of connection 
    cur =con.cursor()
    
    rowArray=cur.execute(f"""
                     SELECT * FROM items;
                     
                     """).fetchall()
    
    # will return {id:1,title:"selling knife",description:...}
    return JSONResponse(jsonable_encoder(dict(row) for row in rowArray))

@app.get('/images/{item_id}')
async def get_image(item_id):
    cur=con.cursor()
    #hexadecimal(16)
    image_bytes =cur.execute(f"""
                             SELECT image from items WHERE id={item_id}
                             """).fetchone()[0]
    #will return from hexadecimal
    return Response(content=bytes.fromhex(image_bytes)) 

@app.post('/signup')
def signup(id:Annotated[str,Form()],password:Annotated[str,Form()]):
    print(id,password)
    return '200'
    
app.mount("/", StaticFiles(directory='frontend', html=True), name='frontend')