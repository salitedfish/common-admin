tar -czf dist.tar dist
scp dist.tar root@60.205.187.162:/usr/share/nginx/html/dist.tar
rm -rf dist
rm -rf dist.tar
ssh root@60.205.187.162 'cd /usr/share/nginx/html && rm -rf superMallAdmin && tar -xzf dist.tar && rm -rf dist.tar && mv dist superMallAdmin'