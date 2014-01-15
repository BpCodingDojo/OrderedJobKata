<?php

require '../JobManager.php';

class JobManagerTest extends PHPUnit_Framework_TestCase {


	public function testGetJobOrder_GivenEmptyString_ReturnEmptyString()
	{
		$jobManager = new JobManager('');
		$this->assertEquals('', $jobManager->getJobOrder());
	}

	public function testGetJobOrder_GivenSingleJob_JobReturned()
	{
		$jobManager = new JobManager('a =>');
		$result = $jobManager->getJobOrder();

		$this->assertContainsExactJobs($result, array('a'));
	}

	public function testGetJobOrder_GivenMultipleJobsWithNoDependencies_JobsReturnedOnAnyOrder()
	{
		$jobManager = new JobManager("a =>\nb =>\nc =>");
		$result = $jobManager->getJobOrder();

		$this->assertContainsExactJobs($result, array('a', 'b', 'c'));
	}

	public function testGetJobOrder_GivenMultipleJobsWithADependency_JobsReturnedDependencyPrependsDependent()
	{
		$jobManager = new JobManager("a =>\nb => c\nc =>");
		$result = $jobManager->getJobOrder();

		$this->assertContainsExactJobs($result, array('a', 'b', 'c'));
		$this->assertDependency($result, 'b', 'c');
	}



	private function assertContainsExactJobs($result, $jobs)
	{
		foreach($jobs as $job) {
			$this->assertTrue(strpos($result, $job) !== false);
		}

		$this->assertEquals(count($jobs), strlen($result));
	}

	private function assertDependency($result, $dependent, $dependency)
	{
		$this->assertTrue(strpos($result, $dependency) < strpos($result, $dependent));
	}

}
