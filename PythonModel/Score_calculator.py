# import values

# negative scores .. 
#   if Memory score game is 70% .. means 30% lagging .. Memory = 30 (negative score) will be considered
#   same will be for Survey and Focus.

def Fatigue_Calculator(POM, PERLOS):     # percentage open mouth, percentage eyes closed
    return (0.3) * POM + (0.7) * PERLOS                # POM = 33.33 % , PERLOS = 66.66%

def Memory(n):      # n = no.of Turns
    if n == 6:
        return 0
    elif n > 6 & n < 16:
        return 10*(n-6)
    else:    # n > 16
        return 100

def Focus(score):
    if score > 0 and score <= 2:
        return (score/2) * 100
    else:       # score > 2
        return 100


def Score_calculator(Fatigue, Survey, Memory, Focus):       # All parameters are percentages
    Weights = {'Memory':0.2, 'Focus': 0.2, 'Fatigue': 0.5, 'Survey': 0.1}        
    Value = {'Memory':Memory, 'Focus': Focus, 'Fatigue': Fatigue, 'Survey': Survey} # percentages
 
    Score = 0 
    for key in Weights:
        Score += Weights[key] * Value[key]

    # if Score >= 0 and Score <= 30:
    #     Severity = "Low"
    # elif Score > 30 and Score <= 50:
    #     Severity = "Mild"
    # elif Score > 50 and Score <= 80:
    #     Severity = "Moderate"
    # elif Score > 80 and Score <= 100:
    #     Severity = "High"
    return Score

# POM = 80
# PERLOS = 50
# n = 17
# score = 2
# Rate = 8
# print(Score_calculator(Fatigue_Calculator(POM, PERLOS), Rate * 10, Memory(n), Focus(score)))