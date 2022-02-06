import * as getIoTs from '@orchestrator/gen-io-ts';

// HACK: Re-export gen-io-ts library
// As some package managers are not able to hoist packages (looking at you yarn berry...🤦)
export { getIoTs };
