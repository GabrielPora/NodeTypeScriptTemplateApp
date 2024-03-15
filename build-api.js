const {
	exec
} = require('child_process');
const esbuild = require('esbuild');
const fs = require('fs');

const environment = process.argv[2] || 'dev';
const isProd = environment == 'prod';

const apiDistDir = './dist/api';
const entryPoint = './apps/api/src/index.ts';

const tscTypeCheckingPlugin = {
	name: 'tsc-type-checking-plugin',
	setup(build) {
		build.onStart(() => tsc());
	},
};

// ESBUILD CONFIGS ----------------------------------------
const sharedConfig = {
	entryPoints: [entryPoint],
	bundle: true,
	platform: 'node',
	outdir: apiDistDir,
	logLevel: 'error',
	minify: false,
	sourcemap: !isProd,
	format: 'cjs',
	plugins: [tscTypeCheckingPlugin],
	external: ['express', 'body-parser', 'reflect-metadata'],
};

// TSC TYPE CHECKING FUNCTION -----------------------------
let isTscRunning = false;
const tsc = () => {
	if (isTscRunning) return;
	isTscRunning = true;
	console.info('TypeScript type checking running...');

	exec('tsc --noEmit', (error, stdout) => {
		isTscRunning = false;
		if (error) {
			console.error(`TypeScript type checking failed: ${error}`);
			console.error('-----------------------------');
			console.error(stdout);
			console.error('-----------------------------');
		} else {
			console.info('TypeScript type checking succeeded.');
		}
	});
}

// DIRECTORY MANIPULATION FUNCTIONS -----------------------
const initDistDirectory = () => {
	if (fs.existsSync(apiDistDir)) {
		fs.rmSync(apiDistDir, {
			recursive: true
		});
	}
	fs.mkdirSync(apiDistDir, {
		recursive: true
	});
};

// MAIN EXECUTION -----------------------------------------
(async () => {
	console.log(`Running ${environment} build for the API...`);
	initDistDirectory();

	await esbuild.build(sharedConfig);
})().catch((err) => {
	console.error(err);
	process.exit(1);
});