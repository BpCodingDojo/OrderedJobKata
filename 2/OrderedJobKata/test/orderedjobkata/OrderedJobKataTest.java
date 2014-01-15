package orderedjobkata;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;

public class OrderedJobKataTest {

    public OrderedJobKata kata;
    
    @Before
    public void init() {
        kata = new OrderedJobKata();
    }
    
    @Test
    public void testEmptyString() {
        assertEquals("", kata.sortJobs(""));
    } 
    
    @Test
    public void testOneJob() {
        String depList = "a=>"; 
        assertEquals(depList.substring(0, 1), kata.sortJobs(depList));
    }
    
    @Test
    public void testMoreJobs() {
        String depList = "a=>, b=>, c=>"; 
        assertEquals("abc", kata.sortJobs(depList));
    }
    
    @Test
    public void testMoreJobsWithOneDependency() {
        String depList = "a=>, b=>c, c=>"; 
        assertEquals("acb", kata.sortJobs(depList));
    }
    
    
}