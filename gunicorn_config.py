import multiprocessing

# Gunicorn Configuration

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2
timeout = 120  # Increased timeout for potential long-running tasks
accesslog = "-"
errorlog = "-"
loglevel = "info"
worker_class = "gthread"
