package orderedjobkata;

public class OrderedJobKata {

    public String sortJobs(String dependencies) {

        String jobsWithoutDependencies = "";
        String jobsWithDep = "";
        if (!dependencies.isEmpty()) {

            String[] deps = dependencies.split(", ");

            for (String actJobWithDep : deps) {
                if (3 == actJobWithDep.length()) {
                   jobsWithoutDependencies += actJobWithDep.substring(0, 1); 
                } else {
                    jobsWithDep += actJobWithDep.substring(0, 1);
                }
            }
        }

        return jobsWithoutDependencies + jobsWithDep;
    }
}
