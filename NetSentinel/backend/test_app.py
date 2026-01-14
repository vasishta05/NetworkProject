import unittest
import json
from app import app

class NetSentinelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_status_endpoint(self):
        response = self.app.get('/api/status')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('bytes_sent', data)
        self.assertIn('bytes_recv', data)

    def test_check_port_open(self):
        # We can't easily guarantee an open port in this environment without spinning one up,
        # but we can test the logic with a known closed one or just structure.
        # Let's test google.com port 80 (usually open)
        response = self.app.post('/api/check-port',
                                 data=json.dumps({'target': 'google.com', 'port': 80}),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'OPEN')

    def test_check_port_invalid(self):
        response = self.app.post('/api/check-port',
                                 data=json.dumps({'target': 'google.com'}), # Missing port
                                 content_type='application/json')
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
