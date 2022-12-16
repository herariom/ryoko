import pytest
import app

@pytest.fixture(scope='module')
def test_client():
    mock_app = app.app
    testing_client = mock_app.test_client()
    context = mock_app.app_context()
    context.push()
    yield testing_client
    context.pop()
