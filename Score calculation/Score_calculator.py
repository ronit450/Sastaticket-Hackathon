# import values

# negative scores .. 
#   if Memory score game is 70% .. means 30% lagging .. Memory = 30 (negative score) will be considered
#   same will be for Survey and Focus.

def Fatigue_Calculator(POM, PERLOS):     # percentage open mouth, percentage eyes closed
    return (0.2) * POM + (0.8) * PERLOS                # POM = 33.33 % , PERLOS = 66.66%

def Score_manager(Survey, Memory,Focus):
    return [100-Survey, 100-Memory, 100-Focus]

def Score_calculator(Fatigue, Survey, Memory, Focus):
    Weights = {'Memory':0.2, 'Focus': 0.2, 'Fatigue': 0.5, 'Survey': 0.1}        
    Value = {'Memory':Memory, 'Focus': Focus, 'Fatigue': Fatigue, 'Survey': Survey}

    Score = 0 
    for key in Weights:
        Score += Weights[key] * Value[key]

    if Score >= 0 and Score <= 30:
        Severity = "Low"
    elif Score > 30 and Score <= 50:
        Severity = "Mild"
    elif Score > 50 and Score <= 80:
        Severity = "Moderate"
    elif Score > 80 and Score <= 100:
        Severity = "High"
    return Severity
