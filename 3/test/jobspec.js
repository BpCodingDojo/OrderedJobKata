var job = require('../src/job').job;

describe("Job", function() {
    it("should return empty sequence when given empty string", function() {
        expect(job.process("")).toEqual("");
    });

    it("should return single job sequence when given one job without dependencies", function() {
        expect(job.process("a =>")).toContain("a");
    });

    it("should return job sequence when given multiple jobs", function() {
        var jobs = job.process("a =>\nb =>\nc =>");

        expect(jobs).toContain("a");
        expect(jobs).toContain("b");
        expect(jobs).toContain("c");
    });

    it("should return job sequence when given multiple jobs with dependencies", function() {
        var jobs = job.process("a =>\nb => c\nc =>");

        expect(jobs).toContain("a");
        expect(jobs.indexOf('c')).toBeLessThan(jobs.indexOf('b'));
    });

    it("should return job sequence when given multiple jobs and jobs in good order by default", function() {
        var jobs = job.process("a =>\nc => \nb => c");

        expect(jobs).toContain("a");
        expect(jobs.indexOf('c')).toBeLessThan(jobs.indexOf('b'));
    });

    it("should return job sequence when given multiple jobs and jobs in good order by default", function() {
        var jobs = job.process("a =>\nb => c\nc => f\nd => a\ne => b\nf =>");

        expect(jobs.indexOf('f')).toBeLessThan(jobs.indexOf('c'));
        expect(jobs.indexOf('c')).toBeLessThan(jobs.indexOf('b'));
        expect(jobs.indexOf('b')).toBeLessThan(jobs.indexOf('e'));
        expect(jobs.indexOf('a')).toBeLessThan(jobs.indexOf('d'));
    });
});
