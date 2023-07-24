tar -czf dist.tar dist
scp dist.tar root@114.55.227.34:/usr/share/nginx/html/dist.tar
rm -rf dist
rm -rf dist.tar
ssh root@114.55.227.34 'cd /usr/share/nginx/html && rm -rf superMallAdmin && tar -xzf dist.tar && rm -rf dist.tar && mv dist superMallAdmin'