For Python, one popular library to do the linting is `flake8`, which checks 
the code against the standard coding style. `pytest` is a basic library for 
testing. Since Python is an interpreted language, it doesn't need to be built.

And regarding tools for building the continuous integration pipeline, some 
other popular tools are, for example, AWS CodePipeline, Azure Pipelines,
Bitbucket Pipelines, and Atlassian Bamboo.

Among the aforementioned setups, Atlassian Bamboo offers an option to be deployed 
on-premise, while the other tools are designed to be offered as a cloud service. 
For cloud-based services like AWS CodePipeline, it might be better to use it as
it is, as it is designed to be easily integrated with other AWS services. For
Atlassian Bamboo, it might depend on the size of the repository and thus what kind 
of equipment is needed to set up the pipeline properly. If the project is very 
confidential, with sensitive information that needs to be secured by all means, 
or the pipeline needs to be deeply customised to suit the need, then setting up 
the pipeline on-primise might be a better option. On the other hand, if the project 
is rather simple, with no particularly sensitive materials and no need for complex 
customisation, then using cloud-based pipeline might be a good choice.