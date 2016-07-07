function input(s, N) {
    var str = Form.Textbox.value.replace(/\s+/g, " ").split(" ");
    var i, j, k = 0, M = 0;
    for (i = 0; i < N; ++i) {
        for (j = 0; j < N; ++j) {
            s[i][j] = +str[k++];
            if (s[i][j] == 0) {
                ++M;
            }
        }
    }
    return M;
}
function output(s, N) {
    var str = "";
    var i, j;
    for (i = 0; i < N; ++i) {
        for (j = 0; j < N; ++j) {
            if (String(s[i][j]).length == 1) {
                str += " ";
            }
            str += s[i][j];
            if (j < N - 1) {
                str += "   ";
            }
        }
        if (i + 1 < N) {
            str += "\n";
        }
    }
	document.Form.Textarea.value = str;
    return;
}
function maketable(table, sum, number, index, N, S) {
    var i, j;
    if (sum > S) {
        return;
    }
    if (number < N) {
        for (i = number > 0 ? table[index.value * N + number - 1] + 1 : 1; i <= N * N && index.value < 32134; ++i) {
            table[index.value * N + number] = i;
            maketable(table, sum + i, number + 1, index, N, S);
        }
    }
    if (sum == S && number == N) {
        if (++index.value < 32134) {
            for (j = 0; j < N - 1; ++j) {
                table[index.value * N + j] = table[(index.value - 1) * N + j];
            }
        }
        return;
    }
    return;
}
function makeblanch(s, usingvalue, blank, blanknumber, M, N, S) {
    var table = new Array(32134 * N);
    var line = new Array(N * N);
    var temparr = new Array(N * N);
    var temp = new Array(N * N);
    var index = { value: 0 };
    var i, j, k, l, flag;
    maketable(table, 0, 0, index, N, S);
    for (i = 0; i < M; ++i) {
        if (usingvalue[i * M] == 0) {
            break;
        }
        for (j = 0; j < N * N; ++j) {
            line[j] = temparr[j] = 0;
        }
        for (j = 0; j < 32134; ++j) {
            flag = 0;
            for (k = 0; k < N * N; ++k) {
                temp[k] = 0;
            }
            for (k = 0; k < N; ++k) {
                for (l = 0; l < N; ++l) {
                    if (s[blank[i].Y][l] == table[j * N + k]) {
                        ++flag;
                        break;
                    }
                    else {
                        temp[table[j * N + k] - 1] = table[j * N + k];
                    }
                }
            }
            if (flag >= N - blanknumber[blank[i].Y]) {
                for (k = 0; k < N * N; ++k) {
                    if (temp[k] > 0) {
                        line[temp[k] - 1] = temp[k];
                    }
                }
            }
        }
        for (j = 0; j < M; ++j) {
            if (usingvalue[i * M + j] == 0) {
                break;
            }
            temparr[usingvalue[i * M + j] - 1] = usingvalue[i * M + j];
        }
        for (j = k = 0; j < N * N; ++j) {
            if (j < M) {
                usingvalue[i * M + j] = 0;
            }
            if (line[j] > 0 && temparr[j] > 0) {
                usingvalue[i * M + k++] = temparr[j];
            }
            line[j] = temparr[j] = 0;
        }
        for (j = 0; j < 32134; ++j) {
            flag = 0;
            for (k = 0; k < N * N; ++k) {
                temp[k] = 0;
            }
            for (k = 0; k < N; ++k) {
                for (l = 0; l < N; ++l) {
                    if (s[l][blank[i].X] == table[j * N + k]) {
                        ++flag;
                        break;
                    }
                    else {
                        temp[table[j * N + k] - 1] = table[j * N + k];
                    }
                }
            }
            if (flag >= N - blanknumber[N + blank[i].X]) {
                for (k = 0; k < N * N; ++k) {
                    if (temp[k] > 0) {
                        line[temp[k] - 1] = temp[k];
                    }
                }
            }
        }
        for (j = 0; j < M; ++j) {
            if (usingvalue[i * M + j] == 0) {
                break;
            }
            temparr[usingvalue[i * M + j] - 1] = usingvalue[i * M + j];
        }
        for (j = k = 0; j < N * N; ++j) {
            if (j < M) {
                usingvalue[i * M + j] = 0;
            }
            if (line[j] > 0 && temparr[j] > 0) {
                usingvalue[i * M + k++] = temparr[j];
            }
            line[j] = temparr[j] = 0;
        }
        if (blank[i].X == blank[i].Y) {
            for (j = 0; j < 32134; ++j) {
                flag = 0;
                for (k = 0; k < N * N; ++k) {
                    temp[k] = 0;
                }
                for (k = 0; k < N; ++k) {
                    for (l = 0; l < N; ++l) {
                        if (s[l][l] == table[j * N + k]) {
                            ++flag;
                            break;
                        }
                        else {
                            temp[table[j * N + k] - 1] = table[j * N + k];
                        }
                    }
                }
                if (flag >= N - blanknumber[N + N]) {
                    for (k = 0; k < N * N; ++k) {
                        if (temp[k] > 0) {
                            line[temp[k] - 1] = temp[k];
                        }
                    }
                }
            }
            for (j = 0; j < M; ++j) {
                if (usingvalue[i * M + j] == 0) {
                    break;
                }
                temparr[usingvalue[i * M + j] - 1] = usingvalue[i * M + j];
            }
            for (j = k = 0; j < N * N; ++j) {
                if (j < M) {
                    usingvalue[i * M + j] = 0;
                }
                if (line[j] > 0 && temparr[j] > 0) {
                    usingvalue[i * M + k++] = temparr[j];
                }
            }
        }
        else if (blank[i].X + N - 1 == blank[i].Y) {
            for (j = 0; j < 32134; ++j) {
                flag = 0;
                for (k = 0; k < N * N; ++k) {
                    temp[k] = 0;
                }
                for (k = 0; k < N; ++k) {
                    for (l = 0; l < N; ++l) {
                        if (s[N - 1 - l][l] == table[j * N + k]) {
                            ++flag;
                            break;
                        }
                        else {
                            temp[table[j * N + k] - 1] = table[j * N + k];
                        }
                    }
                }
                if (flag >= N - blanknumber[N + N + 1]) {
                    for (k = 0; k < N * N; ++k) {
                        if (temp[k] > 0) {
                            line[temp[k] - 1] = temp[k];
                        }
                    }
                }
            }
            for (j = 0; j < M; ++j) {
                if (usingvalue[i * M + j] == 0) {
                    break;
                }
                temparr[usingvalue[i * M + j] - 1] = usingvalue[i * M + j];
            }
            for (j = k = 0; j < N * N; ++j) {
                if (j < M) {
                    usingvalue[i * M + j] = 0;
                }
                if (line[j] > 0 && temparr[j] > 0) {
                    usingvalue[i * M + k++] = temparr[j];
                }
            }
        }
    }
    return;
}
function search(s, blank, checkflag, usingvalue, number, buffer, M, N, S) {
    var sum, i, j;
    if (number > 0) {
        if (checkflag[number - 1] == 1) {
            for (sum = i = 0; i < N; ++i) {
                sum += s[blank[number - 1].Y][i];
            }
            if (sum != S) {
                return 0;
            }
        }
    }
    if (number < M) {
        if (usingvalue[number * M] > 0) {
            for (i = 0; i < M; ++i) {
                if (usingvalue[number * M + i] == 0) {
                    break;
                }
                for (j = 0; j < number; ++j) {
                    if (usingvalue[number * M + i] == buffer[j]) {
                        break;
                    }
                }
                if (j < number) {
                    if (usingvalue[number * M + i] == buffer[j]) {
                        continue;
                    }
                }
                s[blank[number].Y][blank[number].X] = usingvalue[number * M + i];
                buffer[number] = usingvalue[number * M + i];
                if (search(s, blank, checkflag, usingvalue, number + 1, buffer, M, N, S) == 1) {
                    return 1;
                }
            }
        }
    }
    for (i = 0; i < N; ++i) {
        for (sum = j = 0; j < N; ++j) {
            sum += s[j][i];
        }
        if (sum != S) {
            return 0;
        }
    }
    for (sum = i = 0; i < N; ++i) {
        sum += s[i][i];
    }
    if (sum != S) {
        return 0;
    }
    for (sum = i = 0; i < N; ++i) {
        sum += s[N - 1 - i][i];
    }
    if (sum != S) {
        return 0;
    }
    return 1;
}
function func() {
    var N = 6;
    var S = N * (N * N + 1) / 2;
    var s = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
    ];
    var M = 0;
    var g = 0, h = 0, i, j, k, temp;
    var blank = new Array();
    var buffer = new Array();
    var checkflag = new Array();
    var blanknumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var usedvalue = new Array();
    var usingvalue = new Array();
    M = input(s, N);
    for (i = 0; i < M; ++i) {
        blank[i] = { X: -1, Y: -1 };
        checkflag[i] = 0;
    }
    for (i = 0; i < M * M; ++i) {
        usingvalue[i] = 0;
    }
    for (i = 0; i < N; ++i) {
        for (j = 0; j < N; ++j) {
            if (s[i][j] == 0) {
                blank[g].X = j;
                blank[g++].Y = i;
                ++blanknumber[i];
                ++blanknumber[N + j];
                if (j == i) {
                    ++blanknumber[N + N];
                }
                if (j == N - 1 - i) {
                    ++blanknumber[N + N + 1];
                }
            }
            else {
                usedvalue[h++] = s[i][j];
            }
        }
    }
    for (i = 0; 3 * i + 1 < (N * N - M) / 9; ++i) {
        h = 3 * i + 1;
    }
    while (h > 0) {
        for (i = 0; i < N * N - M; ++i) {
            temp = usedvalue[i], j = i;
            while (j >= h && usedvalue[j - h] > temp) {
                usedvalue[j] = usedvalue[j - h];
                j -= h;
            }
            usedvalue[j] = temp;
        }
        h = (h - 1) / 3;
    }
    for (g = h = i = 0; i < N * N - M; ++g, ++i) {
        while (g + 1 != usedvalue[i]) {
            ++g;
            for (k = 0; k < M; ++k) {
                usingvalue[k * M + h] = g;
            }
            ++h;
        }
    }
    while (g++ < N * N) {
        for (k = 0; k < M; ++k) {
            usingvalue[k * M + h] = g;
        }
    }
    makeblanch(s, usingvalue, blank, blanknumber, M, N, S);
    for (i = j = k = 0; j < N; ++i) {
        if (++k >= blanknumber[j]) {
            checkflag[i] = 1;
            ++j;
            k = 0;
        }
    }
    search(s, blank, checkflag, usingvalue, 0, buffer, M, N, S);
    output(s, N);
    return;
}