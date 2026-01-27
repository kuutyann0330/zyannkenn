import cv2 
import mediapipe as mp
from flask import Blueprint, render_template

home_bp = Blueprint('home', __name__, url_prefix='/')

@home_bp.route("/home")
def index():

    import mediapipe as mp
    
    return render_template("home.html")