import cv2 
import mediapipe as mp
from flask import Blueprint, render_template

logic_bp = Blueprint('logic', __name__, url_prefix='/')

@logic_bp.route("/logic")
def index():

    import mediapipe as mp
    return render_template("logic.html")
