const Blockchain = require('./index');
const Block = require('./Block');

describe('Blockchain', () => {
	let blockchain, blockchain2;

	beforeEach(() => {
		blockchain = new Blockchain();
		blockchain2 = new Blockchain();
	});

	it('start with the genesis block', () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
		const data = 'foo';
		blockchain.addBlock(data);
		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
	});

	it('validates a valid chain', () => {
		blockchain2.addBlock('foo');
		expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
	});

	it('invalidates a chain with a corrupt genesis block', () => {
		blockchain2.chain[0].data = "nxna";
		expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
	});

	it('invalidates a corrupt chain', () => {
		blockchain2.addBlock('foo');
		blockchain2.chain[1].data = "not foo";

		expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
	});

	it('replaces the chain with a valid chain', () => {
		blockchain2.addBlock('goo');
		blockchain.replaceChain(blockchain2.chain);

		expect(blockchain.chain).toEqual(blockchain2.chain);
	});

	it('doesnt replaces the chain with one or less than or equal to length', () => {
		blockchain.addBlock('foo');
		blockchain.replaceChain(blockchain2.chain);

		expect(blockchain.chain).not.toEqual(blockchain2.chain);
	});
});