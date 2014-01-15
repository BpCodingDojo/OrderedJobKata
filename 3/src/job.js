var Parser = require('./parser').Parser;

var switchElements = function (list, x, y)
{
    var b = list[y];
    list[y] = list[x];
    list[x] = b;
};

exports.job = {
    process: function(structure) {
        if (structure == '') {
            return '';
        }

        this.parse(structure);

        for (var i = 0; i < this.jobs.length; i++)
        {
            this.processDependencies();
        }

        return this.jobs.join();
    },

    processDependencies: function() {
        for (var jobName in this.dependencies)
        {
            var dependency = this.dependencies[jobName],
                jobIndex = this.jobs.indexOf(jobName),
                dependencyIndex = this.jobs.indexOf(dependency);

            if (jobIndex < dependencyIndex)
            {
                switchElements(this.jobs, this.jobs.indexOf(jobName), this.jobs.indexOf(dependency));
            }
        }
    },

    parse: function(structure)
    {
        var parser = new Parser();
        parser.parse(structure);

        this.jobs = parser.jobs;
        this.dependencies = parser.dependencies;
    }
};
