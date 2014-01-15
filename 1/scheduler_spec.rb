require 'rspec'

class Job

  attr_accessor :name, :dependency



  def initialize(name = nil, dependency = nil)
    @name, @dependency = name, dependency
  end



  def ==(other)
    name == other.name and dependency == other.dependency
  end

end

class JobParser

  def jobs(job_list)
    parse_job_list(job_list).map { |job_specification| parse_job job_specification }
  end



  private

  def parse_job_list(job_list)
    job_list.split("\n")
  end



  def parse_job(job_specification)
    Job.new.tap do |job|
      job.name, job.dependency = job_specification.split('=>').map { |name| name.strip }
    end
  end

end


describe JobParser do
  describe "#jobs" do

    it "should return an array of jobs" do
      jobs_specification = <<-jobs
a =>
b =>
c =>
      jobs
      expect(subject.jobs(jobs_specification)).to eq [ Job.new("a"), Job.new("b"), Job.new("c") ]
    end

    it "should parse dependencies" do
      expect(subject.jobs("a => b")).to eq [ Job.new("a", "b") ]
    end

  end
end


class Scheduler

  def order_jobs(job_list)
    return "" if job_list.empty?
    JobParser.new.jobs(job_list).map { |job| job.name }.join
  end

end


describe Scheduler do
  describe "#order_jobs" do

    it "should return empty string for empty job list" do
      expect(subject.order_jobs("")).to eq ""
    end

    context "when there's only one job" do
      it "should return the job" do
        expect(subject.order_jobs("a =>")).to eq "a"
        expect(subject.order_jobs("b =>")).to eq "b"
      end
    end

    context "when jobs are independent" do
      it "should return the jobs in the same order" do
        jobs = <<-jobs
a =>
b =>
c =>
        jobs
        expect(subject.order_jobs(jobs)).to eq "abc"
      end
    end

    context "when there's a single dependency" do
      pending "should return the order" do
        jobs = <<-jobs
a =>
b => a
c =>
        jobs
        result = subject.order_jobs(jobs)
        result.index("b").should <= result.index("a")
      end
    end
  end
end
