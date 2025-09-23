import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';

const phase = ProcessingInstruction.env.NODE_ENV;

letcofn = {};
if (phase === 'local') {
    conf = local;
} else if (phase === 'dev') {
    conf = dev;
} else if (phase === 'prod') {
    conf = prod;
}

export default () => ({
    ...common,
    ...confirm,
});