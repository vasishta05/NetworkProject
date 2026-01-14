from flask import Flask, jsonify, request
from flask_cors import CORS
import psutil
import requests
import socket
import time

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

@app.route('/api/status', methods=['GET'])
def get_system_status():
    """Returns network statistics (bytes sent/received)."""
    net_io = psutil.net_io_counters()
    return jsonify({
        'bytes_sent': net_io.bytes_sent,
        'bytes_recv': net_io.bytes_recv,
        'packets_sent': net_io.packets_sent,
        'packets_recv': net_io.packets_recv
    })

@app.route('/api/my-ip', methods=['GET'])
def get_my_ip():
    """Fetches public IP and location info."""
    try:
        # Using a free API to get IP info
        response = requests.get('https://ipapi.co/json/', timeout=5)
        data = response.json()
        return jsonify({
            'ip': data.get('ip', 'Unknown'),
            'city': data.get('city', 'Unknown'),
            'region': data.get('region', 'Unknown'),
            'country_name': data.get('country_name', 'Unknown'),
            'org': data.get('org', 'Unknown')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/check-port', methods=['POST'])
def check_port():
    """Checks if a specific port is open on a target host."""
    data = request.json
    target = data.get('target')
    port = data.get('port')

    if not target or not port:
        return jsonify({'error': 'Target and port are required'}), 400

    try:
        port = int(port)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(2) # 2 second timeout
        result = sock.connect_ex((target, port))
        sock.close()

        if result == 0:
            status = 'OPEN'
        else:
            status = 'CLOSED'

        return jsonify({
            'target': target,
            'port': port,
            'status': status
        })
    except ValueError:
        return jsonify({'error': 'Port must be a number'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
