let subjects = [];

function addSubject() {
    let subjectName = document.getElementById("subject").value;
    let gradeValue = parseFloat(document.getElementById("grade").value);
    let creditValue = parseInt(document.getElementById("credit").value);

    if (subjectName === "" || isNaN(creditValue) || isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
        alert("Please enter valid subject details.");
        return;
    }

    subjects.push({ subjectName, gradeValue, creditValue });
    updateSubjectList();
    document.getElementById("subject").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("credit").value = "";
}

function updateSubjectList() {
    let list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach((subject, index) => {
        list.innerHTML += `
            <tr>
                <td>${subject.subjectName}</td>
                <td>${subject.gradeValue}</td>
                <td>${subject.creditValue}</td>
                <td><button onclick="removeSubject(${index})">X</button></td>
            </tr>
        `;
    });
}

function removeSubject(index) {
    subjects.splice(index, 1);
    updateSubjectList();
}

function calculateSGPA() {
    let totalCredits = 0;
    let weightedSum = 0;

    subjects.forEach(subject => {
        totalCredits += subject.creditValue;
        weightedSum += subject.gradeValue * subject.creditValue;
    });

    let sgpa = totalCredits === 0 ? 0 : (weightedSum / totalCredits).toFixed(2);
    document.getElementById("sgpa").innerText = sgpa;

    // Auto Calculate Percentage
    calculatePercentage(sgpa);
}

// ✅ New Percentage Calculation Function
function calculatePercentage(sgpa = null) {
    let sgpaValue = sgpa || parseFloat(document.getElementById("sgpaInput").value);

    if (isNaN(sgpaValue) || sgpaValue < 0 || sgpaValue > 10) {
        alert("Please enter a valid SGPA between 0 and 10.");
        return;
    }

    let percentage = (sgpaValue * 9.56).toFixed(2);
    document.getElementById("percentageOutput").innerText = `Percentage: ${percentage}%`;
}

// CGPA Calculation Functions
function generateSGPAInputs() {
    let semesterCount = parseInt(document.getElementById("semesters").value);
    let container = document.getElementById("sgpaInputs");
    
    if (isNaN(semesterCount) || semesterCount < 1) {
        alert("Please enter a valid number of semesters.");
        return;
    }

    container.innerHTML = ""; // Clear previous inputs

    for (let i = 1; i <= semesterCount; i++) {
        container.innerHTML += `
            <label for="sgpa${i}">SGPA for Semester ${i}:</label>
            <input type="number" id="sgpa${i}" step="0.01" min="0" max="10" required><br>
        `;
    }
}

function calculateCGPA() {
    let semesterCount = parseInt(document.getElementById("semesters").value);
    let totalSGPA = 0;

    if (isNaN(semesterCount) || semesterCount < 1) {
        alert("Please enter a valid number of semesters.");
        return;
    }

    for (let i = 1; i <= semesterCount; i++) {
        let sgpaValue = parseFloat(document.getElementById(`sgpa${i}`).value);

        if (isNaN(sgpaValue) || sgpaValue < 0 || sgpaValue > 10) {
            alert(`Please enter a valid SGPA for Semester ${i} (between 0 and 10).`);
            return;
        }

        totalSGPA += sgpaValue;
    }

    let cgpa = (totalSGPA / semesterCount).toFixed(2);
    document.getElementById("cgpa").innerText = cgpa;
}

function resetForm() {
    subjects = [];
    updateSubjectList();
    document.getElementById("sgpa").innerText = "0.00";
    document.getElementById("semesters").value = "";
    document.getElementById("sgpaInputs").innerHTML = "";
    document.getElementById("cgpa").innerText = "0.00";
    document.getElementById("percentageOutput").innerText = "Percentage: --%";
}
