from flask import Flask , render_template

app = Flask(__name__)

@app.route('/')
def home():
	return '<h1> Hello World </h1>'

@app.route('/pong')
def pong():

	return render_template("PingPong.html")
	
@app.route('/gallery')
def gallery():

	return render_template("CodeAlong.html")
	

if __name__ == "__main__":
	app.run(debug=True,port=8080)
