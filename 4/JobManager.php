<?php

class JobStringParser {

	public function getJobs($jobStrings)
	{
		$jobStrings = $this->removeWhiteSpaces($jobStrings);
		$jobStrings = $this->extractJobsFrom($jobStrings);
		return $this->retrieveJobs($jobStrings);
	}

	private function extractJobsFrom($jobStrings)
	{
		return explode("\n", $jobStrings);
	}

	private function retrieveJobs($jobStrings)
	{
		$jobs = array();

		foreach ($jobStrings as $jobString) {
			$jobString = $this->retrieveJob($jobString);
			$jobs[$jobString[0]] = isset($jobString[1]) ? $jobString[1] : null;
		}

		return $jobs;
	}

	private function retrieveJob($job)
	{
		return explode('=>', $job);
	}

	private function removeWhiteSpaces($jobStrings)
	{
		return str_replace(' ', '', $jobStrings);
	}

}

class JobManager {

	private $jobs = array();

	function __construct($jobStrings)
	{
		$stringParser = new JobStringParser();
		$this->jobs = $stringParser->getJobs($jobStrings);
	}

	public function getJobOrder()
	{
		return implode('', array_keys($this->jobs));
	}
}