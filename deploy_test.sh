tar -czf dist.tar dist
scp dist.tar root@121.43.181.31:/usr/share/nginx/html/dist.tar
rm -rf dist
rm -rf dist.tar
ssh root@121.43.181.31 'cd /usr/share/nginx/html && rm -rf superMallAdmin && tar -xzf dist.tar && rm -rf dist.tar && mv dist superMallAdmin'