var Parser = function() {
    this.jobs = [];
    this.dependencies = {};
};

Parser.prototype.parseSequences = function(sequence) {
    sequence.forEach(function (job) {
        var jobParts = job.split('=>'),
            jobName = jobParts[0],
            dependency = jobParts[1];

        this.jobs.push(jobName);

        if (dependency != '')
        {
            this.dependencies[jobName] = dependency;
        }
    }, this);
};

Parser.prototype.parseLines = function(structure) {
    return structure.replace(/ /g, '').split('\n');
};

Parser.prototype.parse = function(structure) {
    this.parseSequences(
        this.parseLines(structure)
    );
};

exports.Parser = Parser;
