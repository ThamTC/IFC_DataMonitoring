// install mongoDB on ubuntu 20.04
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
// change port mongoDB
https://www.configserverfirewall.com/mongodb/change-mongodb-default-port/

// setting pm2
https://viblo.asia/p/su-dung-pm2-de-deploy-nodejs-application-6J3ZgxWqlmB
https://betterstack.com/community/guides/scaling-nodejs/pm2-guide/

// install redis-server
https://blog.hostvn.net/chia-se/huong-dan-cai-dat-redis-tren-ubuntu-20-04.html

// config pm2 on ubuntu

module.exports = {
    apps: [
        {
            name: 'IFC_DataMonitoring',
            script: './server/index.js',
            cwd: './Products/source', // path-to-project
            instances: 1, // default 1
            autorestart: true,
            exec_mode: 'cluster', // allow scale up app
            env: {
                NODE_ENV: 'production',
            },
	    env_development: {
	    	NODE_ENV: 'development'
	    },
	    env_staging: {
		NODE_ENV: 'staging'
	    }
        },
	{
		name: 'IFC_Dev',
		script: './server/index.js',
		cwd: './Developments/source',
		instance: 1,
		autorestart: true,
		exec_mode: 'cluster',
	}
    ],

    deploy: {
        production: {
            host: 'localhost',
            user: 'thamtc.ifc',
            ssh_options: [
                'ForwardAgent=yes',
            ],
            ref: 'origin/master',
            repo: 'https://github.com/ThamTC/IFC_DataMonitoring.git',
            path: './Products',
	    'post-setup': 'npm install',
            'post-deploy': 'cd ~/App/Products && NODE_ENV=production yarn --production=false;yarn run;pm2 startOrReload ~/App/ecosystem.config.js',
            env: {
                NODE_ENV: 'production',
            },
        },

        development: {
            host: 'localhost',
            user: 'thamtc.ifc',
            ref: 'origin/dev',
            repo: 'https://github.com/ThamTC/IFC_DataMonitoring.git',
            path: './Developments',
            ssh_options: ['PasswordAuthentication=no', 'StrictHostKeyChecking=no'],
	    'post-setup': 'npm install',
            'post-deploy': 'cd ~/App/Developments && NODE_ENV=development yarn --development=false;yarn run;pm2 startOrReload ~/App/ecosystem.config.js',
            env: {
                NODE_ENV: 'development',
            },
        },
    },
};

// start nodejs using pm2
cd ~/project_path/server/
run: pm2 start index.js --name myapp --watch

// run server client
cd ~/client
npm run serve -- --mode=development
// build client
npm run build -- --mode=production

// run server nodejs
cd ~/server
pm2 kill
pm2 start index.js --name myapp --watch
pm2 logs