require 'rack'
require 'rack/contrib/try_static'

# Serve files from the build directory
use Rack::TryStatic,
  root: 'build',
  urls: %w[/],
  try: ['.html', 'index.html', '/index.html']

run lambda{ |env|
  four_oh_four_page = File.expand_path("../build/index.html", __FILE__)
  [ 404, { 'Content-Type'  => 'text/html'}, [ File.read(four_oh_four_page) ]]
}